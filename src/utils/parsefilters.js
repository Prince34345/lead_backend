// this is helper function which has different filteration logics.
const buildLeadFilters = (q = {}) => {
  const f = {};

  const stringFields = ["email", "company", "city"];
  stringFields.forEach((field) => {
    if (q[field]) f[field] = q[field];
    const contains = q[`${field}_contains`];
    if (contains) f[field] = { $regex: contains, $options: "i" };
  });

  ["status", "source"].forEach((field) => {
    if (q[field]) f[field] = q[field];
    const list = q[`${field}_in`];
    if (list) f[field] = { $in: String(list).split(",") };
  });

  const numberFields = ["score", "lead_value"];
  numberFields.forEach((field) => {
    if (q[field] !== undefined) f[field] = Number(q[field]);
    if (q[`${field}_gt`] !== undefined) f[field] = { ...(f[field] || {}), $gt: Number(q[`${field}_gt`]) };
    if (q[`${field}_lt`] !== undefined) f[field] = { ...(f[field] || {}), $lt: Number(q[`${field}_lt`]) };
    const between = q[`${field}_between`];
    if (between) {
      const [a, b] = String(between).split(",").map(Number);
      f[field] = { $gte: a, $lte: b };
    }
  });

  const dateFieldMap = {
    created: "created_at",
    last_activity: "last_activity_at"
  };

  Object.entries(dateFieldMap).forEach(([prefix, field]) => {
    if (q[`${prefix}_on`]) {
      const d = new Date(q[`${prefix}_on`]);
      const next = new Date(d);
      next.setDate(d.getDate() + 1);
      f[field] = { $gte: d, $lt: next };
    }
    if (q[`${prefix}_before`]) f[field] = { ...(f[field] || {}), $lt: new Date(q[`${prefix}_before`]) };
    if (q[`${prefix}_after`]) f[field] = { ...(f[field] || {}), $gte: new Date(q[`${prefix}_after`]) };
    if (q[`${prefix}_between`]) {
      const [a, b] = String(q[`${prefix}_between`]).split(",");
      f[field] = { $gte: new Date(a), $lte: new Date(b) };
    }
  });

  if (q.is_qualified !== undefined) {
    const v = String(q.is_qualified).toLowerCase();
    f.is_qualified = v === "true" || v === "1";
  }

  return f;
};


module.exports = buildLeadFilters;