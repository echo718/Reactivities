using Application.Activities;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class UserActivities
    {
        public class Query : IRequest<Result<List<UserActivityDto>>>
        {
            public string Predicate { get; set; }
            public string UserName { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<List<UserActivityDto>>> Handle(
                Query request,
                CancellationToken cancellationToken
            )
            {
                var userActivities = new List<UserActivityDto>();

                switch (request.Predicate)
                {
                    case "past":
                        userActivities = await _context.Activities
                                        .Where(D => D.Date < DateTime.Now)
                                        .OrderBy(d => d.Date)
                                        .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                                        .AsQueryable()
                                        .Where(d => d.Attendees.Any(a => a.UserName == request.UserName))
                                        .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                                        .ToListAsync();
                        break;
                    case "future":
                        userActivities = await _context.Activities
                                        .Where(D => D.Date >= DateTime.Now)
                                        .OrderBy(d => d.Date)
                                        .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                                        .AsQueryable()
                                        .Where(d => d.Attendees.Any(a => a.UserName == request.UserName))
                                        .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                                        .ToListAsync();
                        break;
                    case "hosting":
                        userActivities = await _context.Activities
                                        .OrderBy(d => d.Date)
                                        .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                                        .AsQueryable()
                                        .Where(d => d.HostUserName == request.UserName)
                                        .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                                        .ToListAsync();

                        break;
                }

                return Result<List<UserActivityDto>>.Success(userActivities);
            }
        }
    }
}
