<script setup lang="ts">
import { ref } from "vue";
import { useCounterStore } from "./stores/counter";
import { FileSpreadsheet, Plus, Minus } from "lucide-vue-next";
import Button from "primevue/button";
import ExcelJS from "exceljs";

const counterStore = useCounterStore();
const excelData = ref<any[]>([]);

async function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(arrayBuffer);

    const worksheet = workbook.worksheets[0];
    const rows: any[] = [];
    const headers: string[] = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) {
        row.eachCell((cell) => {
          headers.push(String(cell.value));
        });
      } else {
        const rowData: Record<string, any> = {};
        row.eachCell((cell, colNumber) => {
          rowData[headers[colNumber - 1]] = cell.value;
        });
        rows.push(rowData);
      }
    });

    excelData.value = rows;
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-8">
    <h1 class="text-4xl font-bold mb-8 text-center">Vue + TypeScript Demo</h1>

    <!-- Pinia Store Demo -->
    <section class="bg-gray-800 rounded-lg p-6 mb-6">
      <h2 class="text-2xl font-semibold mb-4">Pinia Store</h2>
      <div class="flex items-center gap-4 mb-4">
        <Button @click="counterStore.decrement" severity="secondary">
          <Minus :size="16" />
        </Button>
        <span class="text-4xl font-bold min-w-[60px] text-center">{{
          counterStore.count
        }}</span>
        <Button @click="counterStore.increment" severity="secondary">
          <Plus :size="16" />
        </Button>
      </div>
      <p class="text-lg">Double: {{ counterStore.doubleCount }}</p>
    </section>

    <!-- Excel Parser Demo -->
    <section class="bg-gray-800 rounded-lg p-6 mb-6">
      <h2 class="flex items-center gap-2 text-2xl font-semibold mb-4">
        <FileSpreadsheet :size="24" />
        Excel Parser (ExcelJS)
      </h2>
      <input
        type="file"
        accept=".xlsx,.xls"
        @change="handleFileUpload"
        class="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
      />
      <div
        v-if="excelData.length"
        class="mt-4 bg-gray-900 p-4 rounded overflow-auto max-h-[300px]"
      >
        <pre class="text-sm m-0">{{ JSON.stringify(excelData, null, 2) }}</pre>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
