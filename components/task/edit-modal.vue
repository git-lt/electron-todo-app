<template>
  <button class="btn" onclick="my_modal_1.showModal()">
    open modal
  </button>
  <dialog id="my_modal_1" class="modal">
    <form method="dialog" class="modal-box w-11/12 max-w-2xl">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
        ✕
      </button>
      <h3 class="font-bold text-lg">
        新增任务
      </h3>
      <p class="py-4">
        <textarea rows="1" class="w-full textarea textarea-ghost resize-none text-lg  rounded-md" placeholder="任务标题" />
        <textarea rows="2" class="w-full textarea textarea-ghost resize-none text-base  rounded-md" placeholder="请输入任务详情" />
      </p>
      <div class="modal-action">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn w-28">
          取消
        </button>
        <button class="btn btn-primary w-32">
          确认
        </button>
      </div>
    </form>
  </dialog>
</template>
