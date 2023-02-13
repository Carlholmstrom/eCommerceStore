using eCommerceStore.API.Models;
using Microsoft.EntityFrameworkCore;

namespace eCommerceStore.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    { }

    public DbSet<User> Users { get; set; }
    public DbSet<Store> Stores { get; set; }
    public DbSet<Product> Products { get; set; }
    
    public DbSet<Role> Roles { get; set; }
    
    public DbSet<User_Role> UsersRoles { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasOne(u => u.Store)
            .WithMany(s => s.Users)
            .HasForeignKey(u => u.StoreId);
        modelBuilder.Entity<Store>()
            .HasMany(s => s.Products)
            .WithOne(p => p.Store)
            .HasForeignKey(p => p.StoreId);

        modelBuilder.Entity<User_Role>()
            .HasOne(x => x.Role)
            .WithMany(y => y.UserRoles)
            .HasForeignKey(x => x.RoleId);
        modelBuilder.Entity<User_Role>()
            .HasOne(x => x.User)
            .WithMany(y => y.UserRoles)
            .HasForeignKey(x => x.UserId);
        
    }
    
    // modelBuilder.Entity<List<string>>().HasNoKey();
    //
    // modelBuilder.Entity<User>()
    //     .HasOne(u => u.Store)
    //     .WithMany(s => s.Users)
    //     .HasForeignKey(u => u.StoreId);
    //
    // modelBuilder.Entity<Store>()
    //     .HasMany(s => s.Products)
    //     .WithOne(p => p.Store)
    //     .HasForeignKey(p => p.StoreId);

    // modelBuilder.Entity<Product>()
    //     .HasOne(p => p.Store)
    //     .WithMany(s => s.Products)
    //     .HasForeignKey(p => p.StoreId);
}
