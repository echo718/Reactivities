using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<ActivityDto>>>
        {
            public ActivityParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<ActivityDto>>>

        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;

            }
            public async Task<Result<PagedList<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Activities
                .Where(D => D.Date >= request.Params.StartDate)
                .OrderBy(d => d.Date)
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider, new { currentUserName = _userAccessor.GetUsername() })
                    .AsQueryable();

                if (request.Params.IsGoing && !request.Params.IsHosting)
                {
                    query = query.Where(d => d.Attendees.Any(a => a.UserName == _userAccessor.GetUsername()));
                }

                if (request.Params.IsHosting && !request.Params.IsGoing)
                {
                    query = query.Where(d => d.HostUserName == _userAccessor.GetUsername());
                }

                return Result<PagedList<ActivityDto>>.Success(await PagedList<ActivityDto>.CreateAsync(query,
                    request.Params.PageNumber,
                    request.Params.PageSize));
            }

        }
    }
}