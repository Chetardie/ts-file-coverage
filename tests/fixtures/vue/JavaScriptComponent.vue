<template>
  <div class="todo-item">
    <input type="checkbox" :checked="todo.completed" @change="toggleComplete" />
    <span :class="{ completed: todo.completed }">
      {{ todo.text }}
    </span>
    <button @click="deleteTodo" class="delete-btn">Delete</button>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  emits: ['toggle', 'delete'],
  methods: {
    toggleComplete() {
      this.$emit('toggle', this.todo.id);
    },
    deleteTodo() {
      this.$emit('delete', this.todo.id);
    },
  },
};
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.completed {
  text-decoration: line-through;
  color: #888;
}

.delete-btn {
  margin-left: auto;
  background: #ff4444;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
