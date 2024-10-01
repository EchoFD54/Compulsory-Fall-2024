using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class PropertyController(IAppService appService) : ControllerBase
{
    [HttpPost]
    [Route("")]
    public IActionResult CreateProperty(CreatePropertyDto propertyDto)
    {
        var property = appService.CreateProperty(propertyDto);
        return Ok(property);
    }

    [HttpGet]
    [Route("")]
    public ActionResult<List<Property>> GetAllProperties(){
        var proeprties = appService.GetAllProperties();
        return Ok(proeprties);
    }

}
