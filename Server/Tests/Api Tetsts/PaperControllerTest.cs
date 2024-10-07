using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;

public class PaperControllerTest{
    private readonly Mock<IAppService> appServiceMock;
    private readonly PaperController paperController;

    public PaperControllerTest(){
        appServiceMock = new Mock<IAppService>(); 
        paperController = new PaperController(appServiceMock.Object);
    }

     [Fact]
    public void CreatePaper_ReturnsCreatedPaper(){
        var createPaperDto = new CreatepaperDto { Name = "Test Paper", Stock = 50, Price = 100.0 };
        var createdPaper = new PaperDto { Id = 1, Name = "Test Paper", Stock = 50, Price = 100.0 };

        appServiceMock.Setup(s => s.CreatePaper(createPaperDto)).Returns(createdPaper);

        var result = paperController.CreatePaper(createPaperDto);
        var okResult = Assert.IsType<OkObjectResult>(result.Result);  
        var returnedPaper = Assert.IsType<PaperDto>(okResult.Value); 
        Assert.Equal(createdPaper.Id, returnedPaper.Id);
        Assert.Equal("Test Paper", returnedPaper.Name);
    }

    [Fact]
    public void GetAllPapers_ReturnsListOfPapers(){
        var papers = new List<PaperDto>{
            new PaperDto { Id = 1, Name = "Paper 1", Stock = 20, Price = 100.0 },
            new PaperDto { Id = 2, Name = "Paper 2", Stock = 30, Price = 200.0 }
        };


        appServiceMock.Setup(s => s.GetAllPapers()).Returns(papers);

        var result = paperController.GetAllPapers();
        var okResult = Assert.IsType<OkObjectResult>(result.Result);  
        var returnedPapers = Assert.IsType<List<PaperDto>>(okResult.Value);  
        Assert.Equal(2, returnedPapers.Count);
    }

    [Fact]
    public void DiscontinuePaper_ReturnsDiscontinuedPaper(){
        var paperDto = new PaperDto { Id = 1, Name = "Paper 1", Discontinued = true };

        appServiceMock.Setup(s => s.DiscontinuePaper(1)).Returns(paperDto);

   
        var result = paperController.DiscontinuePaper(1);
        var okResult = Assert.IsType<OkObjectResult>(result.Result);  
        var returnedPaper = Assert.IsType<PaperDto>(okResult.Value);  
        Assert.True(returnedPaper.Discontinued);
        Assert.Equal("Paper 1", returnedPaper.Name);
    }

    [Fact]
    public void RestockPaper_ReturnsRestockedPaper(){
        var newStock = 100;
        var paperDto = new PaperDto { Id = 1, Name = "Paper 1", Stock = newStock };

        appServiceMock.Setup(s => s.RestockPaper(1, newStock)).Returns(paperDto);

        var result = paperController.RestockPaper(1, newStock);
        var okResult = Assert.IsType<OkObjectResult>(result.Result);  
        var returnedPaper = Assert.IsType<PaperDto>(okResult.Value);  
        Assert.Equal(100, returnedPaper.Stock);
    }
}