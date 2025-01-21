<template>
  <table id="firstTable">
      <thead>
          <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Requirement</th>
          </tr>
      </thead>
      <tbody>
          <tr
            v-for="issue of filteredIssues"
            :key="issue.id"
            @drop="handleDrop(issue.id, $event)"
            @dragenter.prevent
            @dragover.prevent
          >
              <td>{{ issue.id }}</td>
              <td>{{ issue.title }}</td>
              <td>{{ issue.description }}</td>
              <td>{{ issue.status }}</td>
              <td>{{ issue.requirement.join(", ") }}</td>
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
import { widget, requirejsPromise } from "@widget-lab/3ddashboard-utils";
import issues from "../assets/config/issues.json";

console.debug(widget);
widget.setTitle(widget.getValue("widgetTitle"));

export default {
  name: "App",
  components: {},
  data() {
      return {
          issues: [],
          searchQuery: "",
          tags: [],
          filteredSubjectList: undefined,
          projectId: ""
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
          if (this.filteredSubjectList) {
              filissues = filissues.filter(i => this.filteredSubjectList.includes(i.id.toString()));
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
      widget.addEvent("onRefresh", () => {
          this.projectId = widget.getPreference("Project ID").value;
          this.issues = issues[this.projectId];
          widget.setTitle(widget.getValue("Widget Title"));
      });
      widget.setTitle(widget.getValue("Widget Title"));

      this.taggerProxyCreation();
      this.setupPreferences();
  },
  methods: {
      async taggerProxyCreation() {
          const TagNavigatorProxy = await requirejsPromise("DS/TagNavigatorProxy/TagNavigatorProxy");
          const taggerProxy = TagNavigatorProxy.createProxy({
              widgetId: widget.id,
              filteringMode: "WithFilteringServices"
          });
          taggerProxy.addEvent("onFilterSubjectsChange", data => {
              if (data.filteredSubjectList) {
                  this.filteredSubjectList = data.filteredSubjectList;
                  console.log("data.filteredSubjectList", this.filteredSubjectList);
              }
          }),
              taggerProxy.setSubjectsTags(this.getTagsFromIssues());
      },

      getTagsFromIssues() {
          const tags = {};

          this.issues.forEach(issue => {
              tags[issue.id] = [
                  {
                      object: issue.status,
                      dispValue: issue.status,
                      sixw: "ds6w:when/status"
                  }
              ];
          });
          this.tags = tags;

          return tags;
      },
      setupPreferences() {
          widget.addPreference({
              name: "Widget Title",
              type: "text",
              defaultValue: ""
          });
          widget.addPreference({
              name: "Project ID",
              type: "text",
              defaultValue: 240
          });
          widget.addEvent("onRefresh", () => {
              this.projectId = widget.getValue("Project ID");
              this.issues = issues[this.projectId];
              widget.setTitle(widget.getValue("title"));
          });

          this.projectId = widget.getValue("Project ID");
          this.issues = issues[this.projectId];
          widget.setTitle(widget.getValue("title"));
      },
      handleDrop(issueId, event) {
          console.log("drop", issueId, event.dataTransfer.getData("text"));
          console.log(JSON.parse(event.dataTransfer.getData("text")).data.items[0]);
          const reqName = JSON.parse(event.dataTransfer.getData("text")).data.items[0].displayName;
          const issue = this.issues.find(i => i.id === issueId);
          if (issue) {
              issue.requirement.push(reqName);
          }
      }
  }
};
</script>
