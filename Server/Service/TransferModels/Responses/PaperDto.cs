using DataAccess.Models;

public class PaperDto{
    public PaperDto FromEntity(Paper paper){
        return new PaperDto{
            Id = paper.Id,
            Name = paper.Name,
            Discontinued = paper.Discontinued,
            Stock = paper.Stock,
            Price = paper.Price,

        };
    }

    public string Name { get; set; } = null!;

    public bool Discontinued { get; set; }

    public int Stock { get; set; }

    public double Price { get; set; }

    public int Id{get; set;}
}