using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        //public class Query : IRequest<Result<List<Activity>>> { }
        public class Query : IRequest<List<Activity>> { }

        //public class Handler : IRequestHandler<Query, Result<List<Activity>>>
        public class Handler : IRequestHandler<Query, List<Activity>>

        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            //public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {

                //return List<Activity>.Success(await _context.Activities.ToListAsync(cancellationToken));
                return await _context.Activities.ToListAsync(cancellationToken);
            }

        }
    }
}