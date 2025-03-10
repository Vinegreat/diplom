
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Proect_practika_leto.Services;

namespace Proect_practika_leto
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            var conStr = builder.Configuration.GetConnectionString("default");
            builder.Services.AddDbContext<DbPractickaContext>(opt => opt.UseSqlite(conStr));
            var mapper = new MapperConfiguration(x => x.AddProfile<MapperProfile>()).CreateMapper();
            builder.Services.AddSingleton(mapper);
            builder.Services.AddTransient<ProductionOrderService>();
            builder.Services.AddTransient<TechnologicalMapService>();
            builder.Services.AddTransient<ProductionOperationService>();
            builder.Services.AddTransient<DictionaryService>();
            builder.Services.AddControllers();         
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseCors(
                    x=>x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()
                    );
            }

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
