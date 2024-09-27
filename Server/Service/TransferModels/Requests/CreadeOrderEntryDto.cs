using DataAccess.Models;

public class CreateOrderEntryDto{
    public int Quantity { get; set; }
    public int? ProductId { get; set; }
    public int? OrderId { get; set; }
    public virtual Order? Order { get; set; }
    public virtual Paper? Product { get; set; }
    
    public OrderEntry ToOrderEntry(){
        return new OrderEntry{
            Quantity = Quantity,
            ProductId = ProductId,
            OrderId = OrderId,
            Order = Order,
            Product = Product,
        };
    }
}