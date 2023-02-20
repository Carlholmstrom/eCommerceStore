// using AutoMapper;
// using eCommerceStore.API.Controllers;
// using eCommerceStore.API.Dto;
// using eCommerceStore.API.Interfaces;
// using eCommerceStore.API.Models;
// using FluentAssertions;
// using Microsoft.AspNetCore.Mvc;
// using Moq;
// using System.Collections.Generic;
// using System.Threading.Tasks;
// using Xunit;
//
// namespace eCommerceStore.API.Tests
// {
//     public static class TestHelper
//     {
//         public static IMapper CreateMapper()
//         {
//             var configuration = new MapperConfiguration(cfg => { cfg.AddProfile(new AutoMapperProfile()); });
//
//             return configuration.CreateMapper();
//         }
//     }
//
//     public class UsersControllerTests
//     {
//         [Fact]
//         public async Task GetUsersAsync_WithValidInput_ReturnsOkObjectResultWithListOfUserDtos()
//         {
//             // Arrange
//             var mockUserRepository = new Mock<IUserRepository>();
//             var mockMapper = new Mock<IMapper>();
//             var users = new List<User>
//             {
//                 new User { Id = 1, Email = "test1@example.com" },
//                 new User { Id = 2, Email = "test2@example.com" }
//             };
//             var userDtos = new List<UserDto>
//             {
//                 new UserDto { Id = 1, Email = "test1@example.com" },
//                 new UserDto { Id = 2, Email = "test2@example.com" }
//             };
//             mockUserRepository.Setup(repo => repo.GetAllAsync())
//                 .ReturnsAsync(users);
//             mockMapper.Setup(m => m.Map<List<UserDto>>(users))
//                 .Returns(userDtos);
//
//             var controller = new UsersController(mockUserRepository.Object, mockMapper.Object);
//
//             // Act
//             var result = await controller.GetUsersAsync();
//
//             // Assert
//             result.Should().BeOfType<OkObjectResult>();
//             ((OkObjectResult)result).Value.Should().BeEquivalentTo(userDtos);
//         }
//
//         [Fact]
//         public async Task GetUserAsync_WithValidInput_ReturnsOkObjectResultWithUserDto()
//         {
//             // Arrange
//             var mockUserRepository = new Mock<IUserRepository>();
//             var mockMapper = new Mock<IMapper>();
//             var user = new User { Id = 1, Email = "test@example.com" };
//             var userDto = new UserDto { Id = 1, Email = "test@example.com" };
//             mockUserRepository.Setup(repo => repo.GetAsync(user.Id))
//                 .ReturnsAsync(user);
//             mockMapper.Setup(m => m.Map<UserDto>(user))
//                 .Returns(userDto);
//
//             var controller = new UsersController(mockUserRepository.Object, mockMapper.Object);
//
//             // Act
//             var result = await controller.GetUserAsync(user.Id);
//
//             // Assert
//             result.Should().BeOfType<OkObjectResult>();
//             ((OkObjectResult)result).Value.Should().BeEquivalentTo(userDto);
//         }
//
//         [Fact]
//         public async Task GetUserAsync_WithInvalidInput_ReturnsNotFoundResult()
//         {
//             // Arrange
//             var mockUserRepository = new Mock<IUserRepository>();
//             var mockMapper = new Mock<IMapper>();
//             var id = 1;
//             mockUserRepository.Setup(repo => repo.GetAsync(id))
//                 .ReturnsAsync((User)null);
//
//             var controller = new UsersController(mockUserRepository.Object, mockMapper.Object);
//
//             // Act
//             var result = await controller.GetUserAsync(id);
//
//             // Assert
//             result.Should().BeOfType<NotFoundResult>();
//         }
//
//     }
// }