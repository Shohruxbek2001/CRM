<template>
  <td scope="row" class="py-3 font-medium text-gray-900 whitespace-nowrap">
    <div class="flex items-center">
      <div class="rounded-full w-12 h-12 bg-slate-400 flex justify-center items-center uppercase text-white text-2xl" alt="Avatar">{{ admin.name.slice(0, 1) }}</div>
      <div class="ml-2 inline-block">
        <p class="text-sm leading-5 font-medium text-gray-900">
          {{ admin.name }}
        </p>
      </div>
    </div>
  </td>
  <td class="py-3 font-medium text-gray-900 whitespace-nowrap">
    {{ admin.email }}
  </td>
</template>
<script>
export default {
  name: 'TableItemForAdmins',
  props: {
    admin: {
      type: Object,
      required: true,
    },
  },
}
</script>
