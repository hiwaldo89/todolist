<template>
  <div class="list-item py-2 w-full">
    <div class="flex items-center">
      <div class="mr-auto">
        <div v-if="editing">
          <input
            ref="itemVal"
            :value="item.value"
            type="text"
            class="shadow border rounded py-2 px-3 focus:outline-none focus:shadow-outline"
          />
          <button
            class="submit-button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
            @click="saveItem(item.id)"
          >
            Save
          </button>
        </div>
        <span v-else class="text-white">
          {{ item.value }}
        </span>
      </div>
      <a href="#" @click.prevent="childrenForm = !childrenForm">
        <font-awesome-icon :icon="['fal', 'list']" class="mr-3 text-white" />
      </a>
      <a href="#" @click.prevent="editing = !editing">
        <font-awesome-icon :icon="['fal', 'edit']" class="mr-3 text-white" />
      </a>
      <a href="#" @click.prevent="deleteItem(item.id)">
        <font-awesome-icon :icon="['fal', 'trash-alt']" class="text-white" />
      </a>
    </div>
    <div v-if="childrenForm" class="my-5">
      <input
        v-model="children"
        type="text"
        class="shadow border rounded py-2 px-3 focus:outline-none focus:shadow-outline"
      />
      <button
        class="submit-button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
        @click="addChildren(item.id)"
      >
        Add children
      </button>
    </div>
    <transition-group
      v-if="item.children.length > 0"
      name="slide-fade"
      tag="ul"
      class="list-disc pl-10"
    >
      <li
        v-for="child in item.children"
        :key="child.id"
        class="text-white child-item"
      >
        <span class="flex items-center">
          {{ child.value }}
          <a
            href="#"
            class="ml-2"
            @click.prevent="deleteChild(item.id, child.id)"
          >
            <font-awesome-icon :icon="['fal', 'times']" class="text-white" />
          </a>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editing: false,
      childrenForm: false,
      children: ''
    }
  },
  methods: {
    saveItem(id) {
      this.$store.dispatch('updateItem', {
        id,
        value: this.$refs.itemVal.value
      })
      this.editing = false
    },
    deleteItem(id) {
      this.$store.dispatch('deleteItem', id)
    },
    addChildren(id) {
      if (this.children.trim() !== '') {
        this.$store.dispatch('addChild', { id, value: this.children })
        this.childrenForm = false
        this.children = ''
      }
    },
    deleteChild(itemId, childId) {
      this.$store.dispatch('deleteChild', { itemId, childId })
    }
  }
}
</script>

<style scoped lang="scss">
.list-item {
  border-top: solid 1px rgba(255, 255, 255, 0.6);
  border-bottom: solid 1px rgba(255, 255, 255, 0.6);
  margin-top: -1px;
}
.child-item {
  a {
    opacity: 0;
    transition: all 0.3s ease-in-out;
  }
  &:hover {
    a {
      opacity: 1;
    }
  }
}
</style>
