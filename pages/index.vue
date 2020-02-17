<template>
  <div class="container mx-auto flex flex-wrap">
    <div class="w-full sm:w-10/12 md:w-8/12 mx-auto">
      <div class="list-card p-10 rounded-md shadow-xl">
        <div class="flex">
          <input
            v-model="itemValue"
            type="text"
            placeholder="Enter a task"
            class="shadow border rounded py-2 px-3 focus:outline-none focus:shadow-outline w-9/12 md:w-6/12"
          />
          <button
            class="w-2/12 submit-button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
            @click.prevent="addItem"
          >
            Create
          </button>
        </div>
        <div class="list-items mt-10">
          <transition-group name="slide-fade">
            <list-item
              v-for="item in items"
              :key="item.id"
              :item="item"
            ></list-item>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ListItem from '@/components/ListItem'
export default {
  components: {
    ListItem
  },
  data() {
    return {
      itemValue: ''
    }
  },
  computed: mapState(['items']),
  mounted() {
    this.$store.dispatch('fetchList')
  },
  methods: {
    addItem() {
      if (this.itemValue.trim() !== '') {
        this.$store.dispatch('addItem', this.itemValue)
        this.itemValue = ''
      }
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #1eb4f5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
}
.list-card {
  background-color: #374b57;
}
.submit-button {
  background-color: #1eb4f5;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
