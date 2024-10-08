using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class addCancelledProperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isHost",
                table: "ActivityAtendees",
                newName: "IsHost");

            migrationBuilder.AddColumn<string>(
                name: "IsCancelled",
                table: "Activities",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCancelled",
                table: "Activities");

            migrationBuilder.RenameColumn(
                name: "IsHost",
                table: "ActivityAtendees",
                newName: "isHost");
        }
    }
}
