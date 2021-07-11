closes #XXX

<br />

 **What is it supposed to do**  
Explain in short what your PR is for

<br />

 **How can we test your branch**  
Explain how can test your branch as specifically as possible. Mention the page, button, etc. (For back-end route, function, etc.)

<br />

**General checklist**
- [ ] Tested happy flow.
- [ ] Tested unhappy flow.
- [ ] No unexpected exceptions.
- [ ] No code with high complexity. (Big O)
- [ ] EOF newline.
- [ ] No floating comma's and spaces.
- [ ] No unexpected/unhandled errors.
- [ ] Lines no longer than 'guideline' in IDE.
- [ ] Correct indentation
- [ ] No usage of legacy functionalities.
- [ ] (JS) Curly braces on the sameline as reserved keywords *(`if () {` instead of `{` on line below)*
- [ ] (JS) No double quotes.
- [ ] (JS) Single newline above unique code structures and reserved keywords.
- [ ] (JS) Variables bundled where possible.
- [ ] (JS) No semi-colons except where they have a functional necessity, such as for-loops.

<br />

**If relevant, front-end checklist**
- [ ] Responsive. (Desktop all the way to mobile 320px)
- [ ] Using SCSS variables where relevant.
- [ ] Relevant class names
- [ ] No modified global SCSS properties, except if necessary and fully tested the impact.
- [ ] Checked [caniuse](https://caniuse.com) for more modern CSS properties.

<br />

**If relevant, back-end checklist**
- [ ] No unhandled promise rejections.
- [ ] Seeders still functional.
- [ ] No primary-key violations.
- [ ] Normalization, atleast [3NF](https://en.wikipedia.org/wiki/Database_normalization).
- [ ] Used guards (middleware) where necessary and tested if route is guarded.

<br />

**If relevant, test these browsers**
- [ ] Chrome
- [ ] Firefox
- [ ] Opera
- [ ] Edge
- [ ] Safari

---

**PR Rules**  
*1. Add relevant labels.*  
*2. Select atleast two reviewers.*  
*3. Assign all reviewers allowed to merge the branch, including yourself.*  
*4. If relevant to the sprint, put related issue in 'Awaiting Approval' column on project board.*  
*5. Add to the corresponding [milestone](https://github.com/AjobK/Seaqull/milestones).*
