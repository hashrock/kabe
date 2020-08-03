new Vue({
  el: "#app",
  data: {
    files: [],
    offset: null,
    selected: null,
    orig: { x: 0, y: 0 },
  },
  methods: {
    down(obj, e) {
      this.offset = { x: e.offsetX, y: e.offsetY };
      this.selected = obj;
      this.orig.x = obj.pos.x;
      this.orig.y = obj.pos.y;
      e.target.setPointerCapture(e.pointerId);
    },
    up(e) {
      this.offset = null;
      this.selected = null;

      const obj = this.files;
      const method = "POST";
      const body = JSON.stringify(obj);
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      fetch("./files", { method, headers, body })
        .then((res) => res.json())
        .then(console.log)
        .catch(console.error);
    },
    move(e) {
      if (this.offset) {
        this.selected.pos.x = this.orig.x + e.offsetX - this.offset.x;
        this.selected.pos.y = this.orig.y + e.offsetY - this.offset.y;
      }
    },
  },
  async mounted() {
    const res = await fetch("./assets/index.json");
    if (res.ok) {
      const files = await res.json();
      for (const f of files) {
        if (
          !this.files.find((item) => {
            return item.file === f.file;
          })
        ) {
          this.files.push(f);
        }
      }
    }
    const filesRes = await fetch("/files");
    const newFiles = await filesRes.json();

    for (const f of newFiles) {
      if (
        !this.files.find((o) => {
          return o.file === f.file;
        })
      ) {
        this.files.push({
          file: f,
          pos: {
            x: 200 * (idx % 10),
            y: 100 * Math.floor(idx / 10),
          },
        });
        idx++;
      }
    }
  },
});
