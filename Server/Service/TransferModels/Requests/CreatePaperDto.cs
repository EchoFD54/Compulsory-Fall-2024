using DataAccess.Models;
using System.ComponentModel.DataAnnotations;

public class CreatepaperDto{
    [Required]
    [StringLength(100, ErrorMessage = "Paper Name can not be longer than 100 characters")]
    public string Name { get; set; } = null!;

    public bool Discontinued { get; set; }

    [Range(0, double.MaxValue, ErrorMessage = "Can not have negative stock")]
    public int Stock { get; set; }

    [Required]
    [Range(0, double.MaxValue, ErrorMessage = "Price must be equal or greater than 0")]
    public double Price { get; set; }

    public Paper ToPaper(){
        return new Paper{
            Name = Name,
            Discontinued = Discontinued,
            Stock = Stock,
            Price = Price
        };
    }
}