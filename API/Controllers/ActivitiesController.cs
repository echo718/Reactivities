using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Update.Internal;

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
            return HandleResult(await Mediator.Send(new Application.Activities.List.Query(), ct));
        }

        [HttpGet("{id}")] //api/activities/jkljk
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            var result = await Mediator.Send(new Application.Activities.Details.Query { Id = id });

            return HandleResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {

            return HandleResult(await Mediator.Send(new Application.Activities.Create.Command { Activity = activity }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {

            activity.Id = id;

            return HandleResult(await Mediator.Send(new Application.Activities.Edit.Command { Activity = activity }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {

            return HandleResult(await Mediator.Send(new Application.Activities.Delete.Command { Id = id }));
        }

        [HttpPost("{id}/sttend")]
        public async Task<IActionResult> Attend(Guid id)
        {

            return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
        }
    }
}