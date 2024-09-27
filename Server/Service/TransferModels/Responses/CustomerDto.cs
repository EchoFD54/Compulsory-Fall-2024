using DataAccess.Models;

public class CustomerDto{
    public CustomerDto FromEntity(Customer customer){
        return new CustomerDto{
            Id= customer.Id,
            Name = customer.Name,
            Address = customer.Address,
            Phone = customer.Phone,
            Email = customer.Email
        };

    }

     public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Address { get; set; }

    public string? Phone { get; set; }

    public string? Email { get; set; }

}