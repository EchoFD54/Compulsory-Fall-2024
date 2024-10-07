using DataAccess.Models;
using System.ComponentModel.DataAnnotations;

public class CreateCustomerDto{
    [Required(ErrorMessage = "Name is required.")]
    public string Name {get; set;} = null!;

    [Required]
    [StringLength(100, ErrorMessage = "Address cannot be longer than 100 characters.")]
    public string? Address { get; set; }


    [Required]
    [Phone(ErrorMessage = "Invalid phone number.")]
    public string? Phone { get; set; }


    [Required]
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    public string? Email { get; set; }

    public Customer ToCustomer(){
        return new Customer{
        Name = Name,
        Address = Address,
        Phone = Phone,
        Email = Email
        };
    }

}