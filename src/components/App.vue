<template>
  <table id="firstTable">
      <thead>
          <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="issue of filteredIssues" :key="issue.id">
              <td>{{ issue.id }}</td>
              <td>{{ issue.title }}</td>
              <td>{{ issue.description }}</td>
              <td>{{ issue.status }}</td>
          </tr>
      </tbody>
  </table>
</template>

<!-- no scope for app.vue, style defined here is global for the app -->
<style>
html {
  overflow-y: auto !important;
  overflow-x: hidden !important;
}
table,
th,
td {
  border: 1px solid;
}
</style>

<script>
import { widget } from "@widget-lab/3ddashboard-utils";
 
import issues from "../assets/config/issues.json";

console.debug(widget);
widget.setTitle(widget.getValue("widgetTitle"));

export default {
  name: "App",
  components: {},
  data() {
      return {
          hello: "Hello World Widget :)",
          issues: issues[240],
          searchQuery: ""
      };
  },
  computed: {
      message() {
          return this.$store.state.message;
      },
      filteredIssues() {
          let filissues = this.issues;
          if (filissues) {
              filissues = filissues.filter(i => i.title.includes(this.searchQuery));
          }
          return filissues;
      }
  },
  watch: {},
  mounted() {
      widget.addEvent("onSearch", searchinput => {
          this.searchQuery = searchinput;
      });

      widget.addEvent("onResetSearch", () => {
          this.searchQuery = "";
      });
  },
  methods: {}
};
</script>
