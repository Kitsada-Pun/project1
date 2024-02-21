<script setup>
import {ref} from "vue"; 
    const show = ref(false);
    const props = defineProps({
        item: {
            type: array,
            reqired: true,
        }
    });
    const Statuses = computed(() => {
        return [...newSet(props.item.map(item => item.status))];
    });

</script>

<template>
  <div>
    <button @click="show - !show"
      class="w-full flex item-center justify-center py-2 px-4 text-sm font-medium text-gray-900"
    >
      filter
    </button>
    <div class="absolute top-12 right-0 z-10 w-48 p-3 bg-while rounded-lg shadow">
        <h6 class="mb-3 text-sm font-medium text-gray-900">Status</h6>
        <ul class="space-y-2 text-sm">
            <li v-for="(status,index) in statuses">
                <input :id="`filter_option_${index}`" type="checkbox" value="status" class="w-4">
                <label for="`filter_option_${index}`" class="ml-2 text-sm font-medium">{{ status }}</label>
            </li>
        </ul>
    </div>
  </div>
</template>
