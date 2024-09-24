using DataAccess.DataAccess;
using DataAccess.Models;
using Microsoft.Extensions.Logging;

public interface IAppService{
    public PaperDto CreatePaper(CreatepaperDto createpaperDto);
    public List<Paper> GetAllPapers();
}

public class AppService(
    ILogger<AppService> logger, 
    IAppRepository appRepository,
    AppDbContext context) : IAppService
{
    public PaperDto CreatePaper(CreatepaperDto createpaperDto)
    {
        var paper = createpaperDto.ToPaper();
        Paper newPaper = appRepository.Createpaper(paper);
        return new PaperDto().FromEntity(newPaper);
    }

    public List<Paper> GetAllPapers()
    {
        return context.Papers.ToList();
    }
}