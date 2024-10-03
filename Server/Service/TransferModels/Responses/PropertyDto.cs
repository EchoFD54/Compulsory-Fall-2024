using DataAccess.Models;

public class PropertyDto{
    public PropertyDto FromEntity(Property property){
        return new PropertyDto{
            Id = property.Id,
            PropertyName = property.PropertyName,
            //Papers = property.Papers
        };
    }

    

    public int Id { get; set; }

    public string PropertyName { get; set; } = null!;

    //public virtual ICollection<Paper> Papers { get; set; } = new List<Paper>();
}