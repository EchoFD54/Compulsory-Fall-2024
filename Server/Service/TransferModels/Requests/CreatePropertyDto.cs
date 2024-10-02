using DataAccess.Models;

public class CreatePropertyDto{
    public string PropertyName { get; set; } = null!;

    public Property ToProperty(){
        return new Property{ 
        PropertyName = PropertyName,
        };
    }
}