using LebenChallenge.Application.DTO;
using LebenChallenge.Application.Interfaces;
using LebenChallenge.Application.UseCases;
using LebenChallenge.Domain;
using Microsoft.AspNetCore.Mvc;

namespace LebenChallenge.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TaskItemController : ControllerBase
{
    private readonly ICreateTaskUseCase _createTaskUseCase;
    private readonly IGetAllTasksUseCase _getAllTasksUseCase;
    private readonly ICompleteTaskUseCase _completeTaskUseCase;
    private readonly IGetTaskByIdUseCase _getTaskByIdUseCase;
    private readonly IDeleteTaskUseCase _deleteTaskUseCase;
    private readonly IUpdateTaskUseCase _updateTaskUseCase;
    private readonly ISetTaskPriorityUseCase _setTaskPriorityUseCase;


    public TaskItemController(
        ICreateTaskUseCase createTaskUseCase,
        ICompleteTaskUseCase completeTaskUseCase,
        IGetAllTasksUseCase getAllTasksUseCase,
        IGetTaskByIdUseCase getTaskByIdUseCase,
        IDeleteTaskUseCase deleteTaskUseCase,
        IUpdateTaskUseCase updateTaskUseCase,
        ISetTaskPriorityUseCase setTaskPriorityUseCase
    )
    {
        _createTaskUseCase = createTaskUseCase;
        _completeTaskUseCase = completeTaskUseCase;
        _getAllTasksUseCase = getAllTasksUseCase;
        _getTaskByIdUseCase = getTaskByIdUseCase;
        _deleteTaskUseCase = deleteTaskUseCase;
        _updateTaskUseCase = updateTaskUseCase;
        _setTaskPriorityUseCase = setTaskPriorityUseCase;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var tasks = await _getAllTasksUseCase.ExecuteAsync();
        return Ok(tasks);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var task = await _getTaskByIdUseCase.ExecuteAsync(id);
        if (task == null)
        {
            return NotFound();
        }
        return Ok(task);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTaskDTO dto)
    {
        TaskItem newTaskItem = await _createTaskUseCase.ExecuteAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = newTaskItem.Id }, newTaskItem);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var isdeleted = await _deleteTaskUseCase.ExecuteAsync(id);
        if (isdeleted)
        {
            return NoContent();
        }
        return NotFound();
    }
    

    [HttpPut("{id}/complete")]
    public async Task<IActionResult> Complete(int id)
    {
        var completeTaskDTO = new CompleteTaskDTO { Id = id };
        var task = await _completeTaskUseCase.ExecuteAsync(completeTaskDTO);
        if (task == null)
        {
            return NotFound();
        }
        return Ok(task);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateTaskDTO dto)
    {
        var task = await _updateTaskUseCase.ExecuteAsync(id, dto);
        if (task == null)
        {
            return NotFound();
        }
        return Ok(task);
    }

    [HttpPut("{id}/priority")]
    public async Task<IActionResult> SetPriority(int id, [FromBody] SetTaskPriorityDTO dto)
    {
        var updatedTask = await _setTaskPriorityUseCase.ExecuteAsync(id, dto.Priority);
        if (updatedTask == null)
        {
            return BadRequest("Tarea no encontrada o prioridad no valida");
        }
        return Ok(updatedTask);
    }
}
