class Account:
    account_id = ""
    user_id = ""
    account_type = ""
    balance = 0.0

    def __init__(self, account_id, user_id, account_type, balance):
        self.account_id = account_id
        self.user_id = user_id
        self.account_type = account_type
        self.balance = balance

    
    def add_balance(self, amount):
        self.balance += amount


account_one = Account("acc123", "user123", "savings", 1000.0)
account_one.add_balance(500.0)
print(account_one.balance)