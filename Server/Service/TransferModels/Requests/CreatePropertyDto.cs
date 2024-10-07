using System.ComponentModel.DataAnnotations;
using DataAccess.Models;

public class CreatePropertyDto{
    [Required]
    [StringLength(100, ErrorMessage = "Property Name can not be longer than 100 characters")]
    public string PropertyName { get; set; } = null!;

    public Property ToProperty(){
        return new Property{ 
        PropertyName = PropertyName,
        };
    }
}