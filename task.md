# Catalog update
- Approved: broad searchable catalog, real 3D only where a model is available. Prioritize F40, 250 GTO, LaFerrari, Testarossa, Purosangue.
- Keep existing 458 3D; do not mislabel its mesh as another car.
- Wikipedia REST summaries fetched via curl; photos for primary six plus F50/Enzo. Official Ferrari endpoint blocked. No additional licensed downloadable 3D obtained.
- Build upper-left search dialog, 23-model curated catalog, per-car page data, honest photo/info fallback, accessible keyboard navigation.
- Test selection, search, empty state, Escape, mobile overflow, build.
- Done: upper-left search, 23 curated entries, filters, per-car copy/spec panels, Wikimedia photos and explicit no-3D state. 458 retains original 3D.
- Verified: build succeeds; 23 results, priority five selection, empty search, Escape close, 3D filter, desktop F40 screenshot and mobile Purosangue screenshot. No page errors in final browser test; no mobile or dialog overflow.

# Racing edition
- Approved: stronger racing visual and animation, model transitions, richer histories, timeline and two-car comparison.
- Scope: frontend components/styles and narrative data; no backend, paid assets or new 3D.
- Grounding: existing Wikipedia REST research for priority six. Narrative avoids unsupported performance claims.
- Next: build motion scenes, history/compare, test keyboard/mobile/reduced-motion and build.
- Done: racing speed streaks, animated ticker, scroll reveals/progress, animated photo/model copy transitions, visible motion pause toggle, six-model timeline with 18 historical chapters and source links, 23-model comparison controls.
- Verified build. Browser tested chapter navigation, era arrow keys, comparison selection/same-car notice, search, motion pause and live system reduced-motion preference. No page errors or mobile overflow. Desktop history and comparison screenshots inspected.
- New 3D files remain pending authenticated download/user upload; no new mesh claims.
