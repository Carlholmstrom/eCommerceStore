using eCommerceStore.API.Controllers;
using eCommerceStore.API.Data;
using eCommerceStore.API.Dto;
using eCommerceStore.API.Dto.Incoming;
using eCommerceStore.API.Interfaces;
using eCommerceStore.API.Models;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace eCommerceStore.API.Tests;

public static class TestHelper
{
    public static DbContextOptions<AppDbContext> GetInMemoryDbContextOptions()
    {
        var builder = new DbContextOptionsBuilder<AppDbContext>();
        builder.UseInMemoryDatabase(Guid.NewGuid().ToString());
        return builder.Options;
    }
}

public class AuthControllerTests
{
    [Fact]
    public async Task LoginAsync_WithValidCredentials_ReturnsOkResultWithToken()
    {
        // Arrange
        var mockUserRepository = new Mock<IUserRepository>();
        var mockTokenHandler = new Mock<ITokenHandler>();

        var user = new LoginDto { Email = "test@example.com", Password = "password" };
        var token = "abc123";

        mockUserRepository.Setup(repo => repo.AuthenticateAsync(user.Email, user.Password))
            .ReturnsAsync(new User());
        mockTokenHandler.Setup(handler => handler.CreateTokenAsync(It.IsAny<User>())).ReturnsAsync(token);

        var controller = new AuthController(mockUserRepository.Object, mockTokenHandler.Object);

        // Act
        var result = await controller.LoginAsync(user);

        // Assert
        result.Should().BeOfType<OkObjectResult>();
        ((OkObjectResult)result).Value.Should().Be(token);
    }

    [Fact]
    public async Task LoginAsync_WithInvalidCredentials_ReturnsBadRequest()
    {
        // Arrange
        var mockUserRepository = new Mock<IUserRepository>();
        var mockTokenHandler = new Mock<ITokenHandler>();

        var user = new LoginDto { Email = "test@example.com", Password = "password" };

        mockUserRepository.Setup(repo => repo.AuthenticateAsync(user.Email, user.Password))
            .ReturnsAsync((User)null);

        var controller = new AuthController(mockUserRepository.Object, mockTokenHandler.Object);

        // Act
        var result = await controller.LoginAsync(user);

        // Assert
        result.Should().BeOfType<BadRequestObjectResult>();
        ((BadRequestObjectResult)result).Value.Should().Be("Email and/or Password is incorrect");
    }

    [Fact]
    public async Task LoginAsync_WithNullLoginDto_ReturnsBadRequest()
    {
        // Arrange
        var mockUserRepository = new Mock<IUserRepository>();
        var mockTokenHandler = new Mock<ITokenHandler>();

        var controller = new AuthController(mockUserRepository.Object, mockTokenHandler.Object);

        // Act
        var result = await controller.LoginAsync(null);

        // Assert
        result.Should().BeOfType<BadRequestObjectResult>();
        ((BadRequestObjectResult)result).Value.Should().Be("Please provide valid credentials");
    }

    [Fact]
    public async Task LoginAsync_WithNullUser_ReturnsBadRequest()
    {
        // Arrange
        var mockUserRepository = new Mock<IUserRepository>();
        var mockTokenHandler = new Mock<ITokenHandler>();

        var user = new LoginDto { Email = "test@example.com", Password = "password" };

        mockUserRepository.Setup(repo => repo.AuthenticateAsync(user.Email, user.Password))
            .ReturnsAsync((User)null);

        var controller = new AuthController(mockUserRepository.Object, mockTokenHandler.Object);

        // Act
        var result = await controller.LoginAsync(user);

        // Assert
        result.Should().BeOfType<BadRequestObjectResult>();
        ((BadRequestObjectResult)result).Value.Should().Be("Email and/or Password is incorrect");
    }

    [Fact]
    public async Task LoginAsync_WithValidCredentials_ReturnsTokenWithMockedUserRoles()
    {
        // Arrange
        var mockUserRepository = new Mock<IUserRepository>();
        var mockTokenHandler = new Mock<ITokenHandler>();

        var user = new LoginDto { Email = "test@example.com", Password = "password" };
        var token = "abc123";

        mockUserRepository.Setup(repo => repo.AuthenticateAsync(user.Email, user.Password))
            .ReturnsAsync(new User
                { Id = 1, Email = user.Email, Password = "password", Roles = new List<string> { "Admin", "User" } });
        mockUserRepository.Setup(repo => repo.GetUserByEmail(user.Email))
            .ReturnsAsync(new User
                { Id = 1, Email = user.Email, Password = "password", Roles = new List<string> { "Admin", "User" } });
        mockTokenHandler.Setup(handler => handler.CreateTokenAsync(It.IsAny<User>())).ReturnsAsync(token);

        var controller = new AuthController(mockUserRepository.Object, mockTokenHandler.Object);

        // Act
        var result = await controller.LoginAsync(user);

        // Assert
        result.Should().BeOfType<OkObjectResult>();
        ((OkObjectResult)result).Value.Should().Be(token);

        var userWithRoles = await mockUserRepository.Object.GetUserByEmail(user.Email);
        userWithRoles.Roles.Should().NotBeEmpty().And.HaveCount(2).And.Contain("Admin").And.Contain("User");
    }
}