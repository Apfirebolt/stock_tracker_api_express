import asyncHandler from 'express-async-handler'
import { Account, AuditLog } from '../models/account.js'

// @desc    Create a new account
// @route   POST /api/accounts
// @access  Public or Private (set as needed)
const createAccount = asyncHandler(async (req, res) => {
    const { accountNumber, bankName, balance, currency } = req.body;

  const account = await Account.create({
    accountNumber,
    bankName,
    balance,
    currency,
    user: req.user._id,
  });

  if (account) {
    // create a log entry for account creation
    await AuditLog.create({
        action: 'Account Creation',
        user: req.user._id,
        details: `Account ${account._id} created.`,
    });
    res.status(201).json(account);
  } else {
    res.status(400);
    throw new Error("Invalid Account data");
  }
})

// @desc    Get all accounts
// @route   GET /api/accounts
// @access  Public or Private (set as needed)
const getAccounts = asyncHandler(async (req, res) => {
    const accounts = await Account.find({ user: req.user._id }).populate('user', 'email firstName lastName')
    res.json(accounts)
})

// @desc    Get single account
// @route   GET /api/accounts/:id
// @access  Public or Private (set as needed)
const getAccountById = asyncHandler(async (req, res) => {
    const account = await Account.findById(req.params.id).populate('user')
    if (account) {
        res.json(account)
    } else {
        res.status(404)
        throw new Error('Account not found')
    }
})

// @desc    Update account
// @route   PUT /api/accounts/:id
// @access  Public or Private (set as needed)
const updateAccount = asyncHandler(async (req, res) => {
    const account = await Account.findByIdAndUpdate(req.params.id, req.body, { new: true })
    // create a log entry for account update
    await AuditLog.create({
        action: 'Account Update',
        user: req.user._id,
        details: `Account ${req.params.id} updated.`,
    });
    if (account) {
        res.json(account)
    } else {
        res.status(404)
        throw new Error('Account not found')
    }
})

/**
 * @desc    Update only the balance of an account
 * @route   PATCH /api/accounts/:id/balance
 * @access  Public or Private (set as needed)
 */
const updateAccountBalance = asyncHandler(async (req, res) => {
    const { balance } = req.body;
    const account = await Account.findById(req.params.id);
    if (!account) {
        res.status(404);
        throw new Error('Account not found');
    }
    // increment balance
    account.balance += balance;
    // add audit log entry
    await AuditLog.create({
        action: 'Balance Update',
        user: req.user._id,
        details: `Balance updated by ${balance}. New balance: ${account.balance}`,
    });
    await account.save();
    res.json(account);
});

// @desc    Delete account
// @route   DELETE /api/accounts/:id
// @access  Public or Private (set as needed)
const deleteAccount = asyncHandler(async (req, res) => {
    const account = await Account.findByIdAndDelete(req.params.id)
    // create a log entry for account deletion
    await AuditLog.create({
        action: 'Account Deletion',
        user: req.user._id,
        details: `Account ${req.params.id} deleted.`,
    });
    if (account) {
        res.json({ message: 'Account deleted' })
    } else {
        res.status(404)
        throw new Error('Account not found')
    }
})

/**
 * @desc    Set an account as default for the user
 * @route   PATCH /api/accounts/:id/default
 * @access  Public or Private (set as needed)
 */
const setDefaultAccount = asyncHandler(async (req, res) => {
    const accountId = req.params.id;
    const userId = req.user._id;

    // Unset previous default accounts for this user
    await Account.updateMany(
        { user: userId, isDefault: true },
        { $set: { isDefault: false } }
    );

    // Set the selected account as default
    const account = await Account.findOneAndUpdate(
        { _id: accountId, user: userId },
        { $set: { isDefault: true } },
        { new: true }
    );

    // add audit log entry
    await AuditLog.create({
        action: 'Set Default Account',
        user: req.user._id,
        details: `Account ${accountId} set as default`,
    });

    if (!account) {
        res.status(404);
        throw new Error('Account not found');
    }

    res.json(account);
});

export {
    createAccount,
    getAccounts,
    getAccountById,
    updateAccount,
    deleteAccount,
    updateAccountBalance,
    setDefaultAccount
}
