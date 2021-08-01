closes #XXX

<br />

 **What is it supposed to do**  
Explain in short what your PR is for

<br />

 **How can we test your branch**  
Explain how can test your branch as specifically as possible. Mention the page, button, etc. (For back-end route, function, etc.)

<br />

**1. General checklist**
- [ ] a. Tested happy flow.
- [ ] b. Tested unhappy flow.
- [ ] c. No unexpected exceptions.
- [ ] d. No code with high complexity. (Big O)
- [ ] e. EOF newline.
- [ ] f. No floating comma's and spaces.
- [ ] g. No unexpected/unhandled errors.
- [ ] h. Lines no longer than 'guideline' in IDE.
- [ ] i. Correct indentation.
- [ ] j. No usage of legacy functionalities.
- [ ] k. (JS) Curly braces on the sameline as reserved keywords *(`if () {` instead of `{` on line below)*
- [ ] l. (JS) No double quotes.
- [ ] m. (JS) Single newline above unique code structures and reserved keywords.
- [ ] n. (JS) Variables bundled where possible.
- [ ] o. (JS) No semi-colons except where they have a functional necessity, such as for-loops.

<br />

**2. If relevant, front-end checklist**
- [ ] a. Responsive. (Desktop all the way to mobile 320px)
- [ ] b. Using SCSS variables where relevant.
- [ ] c. Relevant class names
- [ ] d. No modified global SCSS properties, except if necessary and fully tested the impact.
- [ ] e. Checked [caniuse](https://caniuse.com) for more modern CSS properties.

<br />

**3. If relevant, back-end checklist**
- [ ] a. No unhandled promise rejections.
- [ ] b. Seeders still functional.
- [ ] c. No primary-key violations.
- [ ] d. Normalization, atleast [3NF](https://en.wikipedia.org/wiki/Database_normalization).
- [ ] e. Used guards (middleware) where necessary and tested if route is guarded.

<br />

**4. If relevant, test these browsers**
- [ ] a. Chrome
- [ ] b. Firefox
- [ ] c. Opera
- [ ] d. Edge
- [ ] e. Safari

---

**PR Rules**  
*1. Add relevant labels.*  
*2. Select atleast two reviewers.*  
*3. Assign all reviewers allowed to merge the branch, including yourself.*  
*4. If relevant to the sprint, put related issue in 'Awaiting Approval' column on project board.*  
*5. Add to the corresponding [milestone](https://github.com/AjobK/Seaqull/milestones).*

> This form should be filled in by the author of this PR.

**Reviewer info**
*1. You can use aliases to refer to specific PR checklist items. For example 'Hey @JohnDoe, for this line please check 3.a and 1.d.'*
*2. Where possible, please use the suggestions feature in github so the author has a better idea of the solution you had in mind.*
