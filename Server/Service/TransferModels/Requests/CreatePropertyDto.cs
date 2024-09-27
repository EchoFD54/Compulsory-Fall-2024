using DataAccess.Models;

public class CreatePropertyDto{
    public string PropertyName { get; set; } = null!;

    public virtual ICollection<Paper> Papers { get; set; } = new List<Paper>();


    public Property ToProperty(){
        return new Property{ 
        PropertyName = PropertyName,
        Papers = Papers
        };
    }
}