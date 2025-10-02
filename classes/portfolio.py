from abc import ABC, abstractmethod
from account import Account

class PortfolioBase(ABC):
    @abstractmethod
    def add_stock(self, stock):
        pass

    @abstractmethod
    def set_account(self, account):
        pass

class Portfolio(PortfolioBase):
    stocks = []
    account = None
    
    def __init__(self):
        self.stocks = []

    def add_stock(self, stock):
        self.stocks.append(stock)
    
    def set_account(self, account):
        self.account = account
        

portfolio = Portfolio()
portfolio.set_account(Account("acc123", "user123", "savings", 1000.0))