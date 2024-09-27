using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class OrderController(IAppService appService) : ControllerBase{

    [HttpPost]
    [Route("")]
    public ActionResult<Order> CreateOrder(CreateOrderDto createOrderDto){
        var order = appService.CreateOrder(createOrderDto);
        return Ok(order);
    }

    [HttpGet]
    [Route("")]
    public ActionResult<List<Order>> GetAllOrders(){
        var orders = appService.GetAllOrders();
        return Ok(orders);
    }

    [HttpGet]
    [Route("customers/{customerId}")]
    public ActionResult<List<OrderDto>> GetOrdersByCustomer(int customerId)
    {
        try
        {
            var orders = appService.GetOrdersByCustomerId(customerId);
            return Ok(orders);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

}