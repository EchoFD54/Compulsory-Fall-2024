using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
[ApiController]
[Route("api/[controller]")]
public class CustomerController(IAppService appService) : ControllerBase{
    [HttpPost]
    [Route("")]
    public ActionResult<Customer> CreateCustomer(CreateCustomerDto createCustomerDto){
        var customer = appService.CreateCustomer(createCustomerDto);
        return Ok(customer);
    }

    [HttpGet]
    [Route("")]
    public ActionResult<List<Customer>> GetAllCustomers(){
        var customers = appService.GetAllCustomers();
        return Ok(customers);
    }

    [HttpGet]
    [Route("email/{email}")]
    public ActionResult<CustomerDto> GetCustomerByEmail(string email){
        var customer = appService.GetCustomerByEmail(email);
        if(customer != null){
            return Ok(customer);
        }
        return NotFound("Customer not found");
    }

    [HttpGet("customer/{customerId}/orders")]
    public ActionResult<List<OrderDto>> GetCustomerOrders(int customerId){
        var orders = appService.GetOrdersByCustomerId(customerId);
        if (orders == null || orders.Count == 0)
        {
            return NotFound("No orders found for this customer.");
        }
        return Ok(orders);
    }

}