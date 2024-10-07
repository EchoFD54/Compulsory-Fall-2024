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
    public ActionResult<List<PaperDto>> GetAllPapers(){
        var papers = appService.GetAllPapers();
        return Ok(papers);
    }

    
    [HttpPut]
    [Route("{id}/discontinue")]
    public ActionResult<PaperDto> DiscontinuePaper(int id) {
        var paper = appService.DiscontinuePaper(id);
        return Ok(paper);
    }

    [HttpPut]
    [Route("{id}/restock")]
    public ActionResult<PaperDto> RestockPaper(int id, [FromBody] int newStock) {
        var paper = appService.RestockPaper(id, newStock);
        return Ok(paper);
    }

}