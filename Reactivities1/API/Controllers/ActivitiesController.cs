using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContext _context;
        public ActivitiesController(DataContext context)
        {
            _context = context;
            
        }

        [HttpGet] //api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities(CancellationToken ct)
        {
            //return HandleResult(await Mediator.Send(new List.Query(), ct));
            return await _context.Activities.ToListAsync();
        }

        [HttpGet("{id}")] //api/activities/jkljk
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
             return await _context.Activities.FindAsync(id);
            // var result = await Mediator.Send(new Details.Query { Id = id });

            // return HandleResult(result);
        }

        // [HttpPost]
        // public async Task<IActionResult> CreateActivity(Activity activity)
        // {

        //     return HandleResult(await Mediator.Send(new Create.Command { Activity = activity }));
        // }

        // [HttpPut("{id}")]
        // public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        // {

        //     activity.Id = id;

        //     return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity }));
        // }

        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteActivity(Guid id)
        // {

        //     return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        // }
    }
}