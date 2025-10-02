class Stock:
    def __init__(self, symbol, name, sector, industry, user_id):
        self.symbol = symbol
        self.name = name
        self.sector = sector
        self.industry = industry
        self.user_id = user_id

    def to_dict(self):
        return {
            "symbol": self.symbol,
            "name": self.name,
            "sector": self.sector,
            "industry": self.industry,
            "user_id": self.user_id
        }

    @staticmethod
    def from_dict(data):
        return Stock(
            symbol=data.get("symbol"),
            name=data.get("name"),
            sector=data.get("sector"),
            industry=data.get("industry"),
            user_id=data.get("user_id")
        )
    

s1 = Stock("AAPL", "Apple Inc.", "Technology", "Consumer Electronics", "user123")
print(s1.to_dict())