using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly IMediator _mediator;
        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;

        }

        [HttpGet] //api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities(CancellationToken ct)
        {
            //return HandleResult(await Mediator.Send(new List.Query(), ct));
            return await _mediator.Send(new Application.Activities.List.Query());
        }

        [HttpGet("{id}")] //api/activities/jkljk
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            //  var result = await Mediator.Send(new Details.Query { Id = id });

            //  return HandleResult(result);
            return await Mediator.Send(new Application.Activities.Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            await Mediator.Send(new Application.Activities.Create.Command { Activity = activity });
            return Ok();

            //return HandleResult(await Mediator.Send(new Create.Command { Activity = activity }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {

            activity.Id = id;
            await Mediator.Send(new Application.Activities.Edit.Command { Activity = activity });
            return Ok();


            //return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {

            await Mediator.Send(new Application.Activities.Delete.Command { Id = id });
            return Ok();
            //return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}