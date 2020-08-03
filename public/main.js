new Vue({
  el: "#app",
  data: {
    files: [],
    msg: "test",
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
      console.log(obj);
      console.log(body);
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
  mounted() {
    fetch("./assets/index.json")
      .then((i) => i.json())
      .then((i) => {
        this.files = i;
      })
      .catch((e) => {})
      .finally(() => {
        fetch("/files")
          .then((i) => i.json())
          .then((i) => {
            let idx = 0;
            for (const f of i) {
              // if (
              //   this.files.find((o) => {
              //     return o.name === f.name;
              //   })
              // ) {
              //   continue;
              // }
              this.files.push({
                file: f,
                pos: {
                  x: 200 * (idx % 10),
                  y: 100 * Math.floor(idx / 10),
                },
              });
              idx++;
            }
          });
      });
  },
});
