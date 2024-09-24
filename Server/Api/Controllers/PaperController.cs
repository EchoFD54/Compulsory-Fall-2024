using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class PaperController(IAppService appService) : ControllerBase{

    [HttpPost]
    [Route("")]
    public ActionResult<Paper> CreatePaper(CreatepaperDto createpaperDto){
        var paper = appService.CreatePaper(createpaperDto);
        return Ok(paper);
    }

    [HttpGet]
    [Route("")]
    public ActionResult<List<Paper>> GetAllPapers(){
        var papers = appService.GetAllPapers();
        return Ok(papers);
    }

}