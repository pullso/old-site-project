Vue.component('task', {
  props: ['data'],
  methods: {
    task_done() {
      this.$emit('task_done');
    },
  },
  template: `
  <div class="task">
    <div>
    <h3 class="task__title"> {{data.title}}</h3>
    <p class="task__desc"> {{data.descr}} </p>
    </div>
    <button @click="task_done()" class="task__done">✔️</button>
  </div>`,
});

var vue = new Vue({
  el: '#app',
  data: {
    tasks: [
      {
        title: 'Изучить VUE.js',
        descr: 'Прочитать книгу по Vue.js',
      },
      {
        title: 'Написать игру на vue.js',
        descr: 'Написать простейшее SPA кликер',
      },
    ],
    new_task: {
      title: '',
      desc: '',
    },
  },
  methods: {
    delete_task(id) {
      this.tasks.splice(id, 1);
    },
    add_task() {
      if (this.new_task.title != '') {
        this.tasks.push({
          title: this.new_task.title,
          descr: this.new_task.descr,
        });
        this.new_task.title = '';
        this.new_task.descr = '';
      }
    },
  },
});
