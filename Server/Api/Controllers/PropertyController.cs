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

    [HttpPost]
    [Route("assignProperty")]
    public ActionResult AssignPropertyToPaper([FromBody] AssignPropertyDto dto)
    {
        try
        {
            Console.WriteLine($"Received PaperId: {dto.PaperId}, PropertyId: {dto.PropertyId}");

        
            appService.AssignPropertyToPaper(dto.PaperId, dto.PropertyId);
            return Ok("Property successfully assigned");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }




}
