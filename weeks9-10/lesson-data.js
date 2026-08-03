window.LESSON_CONFIG = {
  "storageKey": "folding-chair-weeks9-10-guided-v1",
  "resetLabel": "Weeks 9–10"
};
window.THEORY_REFERENCES = {
  mc: ["criteria", "safe-features", "safe-features", "decision-making", "orthogonal", "orthogonal", "dimensioning", "dimensioning", "dimensioning", "cad", "cad", "cad"],
  written: ["criteria", "orthogonal", "dimensioning", "cad"]
};
window.MC_QUESTIONS = [
  {
    "question": "Which statement is the strongest design justification?",
    "options": [
      "I chose it because it looks cool",
      "I chose it because another student did",
      "I chose it because it improves carrying, preserves strength, clears the mechanism and can be made accurately",
      "I chose it because it uses the most material"
    ],
    "correct": 2,
    "hint": "A justification should connect the decision to several relevant criteria.",
    "strongHint": "Look for evidence about function, safety and manufacture—not preference alone.",
    "feedback": [
      "Personal preference does not show that the brief is met.",
      "Copying does not provide project-specific reasoning.",
      "This option uses multiple criteria and explains why the feature suits the product.",
      "Using more material is not automatically better and may reduce portability."
    ]
  },
  {
    "question": "Why should decorative material removal be limited near a pivot hole?",
    "options": [
      "The area carries stress and needs sufficient timber around the hole",
      "Decoration always makes timber waterproof",
      "The pivot hole is only visible from the top",
      "Removing more timber makes every chair stronger"
    ],
    "correct": 0,
    "hint": "A hole already interrupts the fibres and concentrates load locally.",
    "strongHint": "The remaining cross-section around a moving, loaded connection matters.",
    "feedback": [
      "Preserving timber around the hole helps maintain strength and reduce stress concentration.",
      "Decoration does not create waterproofing by itself.",
      "Visibility does not determine structural importance.",
      "Removing material usually reduces rather than guarantees strength."
    ]
  },
  {
    "question": "A handle looks useful when the chair is open but collides with the rear frame while folding. Which criterion has failed?",
    "options": [
      "Colour harmony only",
      "Mechanical clearance and function",
      "Drawing paper size",
      "Timber moisture content only"
    ],
    "correct": 1,
    "hint": "A moving product must be checked through its full range.",
    "strongHint": "The feature prevents the mechanism performing its intended operation.",
    "feedback": [
      "Appearance may be acceptable even though the mechanism fails.",
      "Collision shows the feature does not satisfy movement clearance and function.",
      "Paper size does not cause the collision.",
      "Moisture may affect timber, but the described fault is geometric interference."
    ]
  },
  {
    "question": "What is the main purpose of weighting criteria in a decision matrix?",
    "options": [
      "To make every criterion equally important",
      "To show that some criteria, such as safety and function, have greater importance",
      "To avoid writing a justification",
      "To guarantee the highest-scoring idea is automatically approved"
    ],
    "correct": 1,
    "hint": "Not all project requirements have the same consequence.",
    "strongHint": "A decorative benefit should not outweigh a serious safety weakness.",
    "feedback": [
      "Equal weighting is the opposite of assigning different importance.",
      "Weights make critical criteria contribute more to the comparison.",
      "A written explanation is still needed.",
      "The matrix supports judgement; it does not replace checking and approval."
    ]
  },
  {
    "question": "In third-angle projection, where is the top view placed?",
    "options": [
      "Below the front view",
      "Above the front view",
      "Inside the side view",
      "Anywhere that fits"
    ],
    "correct": 1,
    "hint": "Third-angle views are placed on the same side from which they are observed.",
    "strongHint": "The view seen from above is positioned above the main front view.",
    "feedback": [
      "That placement belongs to a different convention.",
      "In third-angle projection the top view is above the front view.",
      "Views remain separate and aligned.",
      "Technical conventions make placement predictable rather than arbitrary."
    ]
  },
  {
    "question": "Which view best communicates the chair’s folding geometry and pivot relationship?",
    "options": [
      "Side view",
      "Front view only",
      "Title block",
      "A colour sample"
    ],
    "correct": 0,
    "hint": "Imagine looking directly at the crossing frame members.",
    "strongHint": "The movement occurs mainly in the plane visible from the side.",
    "feedback": [
      "The side view shows member overlap, pivot centres, seat angle and open/folded geometry.",
      "The front view shows width and symmetry but not the full folding relationship.",
      "The title block identifies the drawing but does not show geometry.",
      "A colour sample communicates finish, not mechanism."
    ]
  },
  {
    "question": "What does a centre line indicate on a pivot hole?",
    "options": [
      "The axis or exact centre of the circular feature",
      "The waste side of a saw cut",
      "The direction of timber grain",
      "The edge to be painted first"
    ],
    "correct": 0,
    "hint": "It is used for circular and symmetrical features.",
    "strongHint": "The line helps dimensions refer to the centre rather than the edge of the hole.",
    "feedback": [
      "A centre line identifies the hole axis and supports accurate location dimensions.",
      "Waste marks are manufacturing annotations, not centre lines.",
      "Grain direction uses different information.",
      "Finishing order is not shown by a centre line."
    ]
  },
  {
    "question": "What does “6.5 mm Ø” mean?",
    "options": [
      "A radius of 6.5 mm",
      "A circular hole with a diameter of 6.5 mm",
      "A square trench 6.5 mm deep",
      "A line 6.5 mm thick"
    ],
    "correct": 1,
    "hint": "The symbol Ø refers to a circle measured across its centre.",
    "strongHint": "Do not confuse diameter with radius.",
    "feedback": [
      "Radius would be written with R.",
      "The notation specifies a 6.5 mm diameter circular hole.",
      "A trench would use width/depth information rather than Ø.",
      "Technical line thickness is not given this way."
    ]
  },
  {
    "question": "Why are critical hole locations often dimensioned from one datum rather than chained from hole to hole?",
    "options": [
      "To reduce cumulative error",
      "To make the drawing less accurate",
      "To remove all numerical values",
      "To avoid establishing a reference face"
    ],
    "correct": 0,
    "hint": "Every chained measurement can add another tolerance.",
    "strongHint": "A shared starting point keeps related features tied to the same reference.",
    "feedback": [
      "Datum dimensioning reduces the accumulation of small differences.",
      "The intention is greater accuracy, not less.",
      "Dimensions remain necessary.",
      "The datum is the central reference system."
    ]
  },
  {
    "question": "Which CAD feature helps keep a hole centred on another circular feature?",
    "options": [
      "A concentric constraint",
      "A colour gradient",
      "Spell check",
      "A page border"
    ],
    "correct": 0,
    "hint": "The relevant geometric relationship is “same centre”.",
    "strongHint": "Choose the constraint that controls circular axes.",
    "feedback": [
      "A concentric constraint keeps circular features sharing a centre.",
      "Colour has no effect on geometric alignment.",
      "Spell check applies to text, not geometry.",
      "A page border does not control features."
    ]
  },
  {
    "question": "Why must a CAD drawing still be checked against the project plan?",
    "options": [
      "CAD can draw a wrong dimension very accurately",
      "CAD always changes millimetres to centimetres",
      "Computer drawings cannot contain centre lines",
      "The plan image must be scaled with a ruler"
    ],
    "correct": 0,
    "hint": "Software follows the values and references entered by the user.",
    "strongHint": "Precision is not the same as correctness.",
    "feedback": [
      "A perfectly drawn but incorrectly entered dimension remains a manufacturing error.",
      "Units can be set correctly and do not always change.",
      "CAD can display centre lines.",
      "Written dimensions—not scaled pictures—control the work."
    ]
  },
  {
    "question": "What is the purpose of a revision number or date on a technical drawing?",
    "options": [
      "To identify which version contains the current approved information",
      "To increase the chair’s strength",
      "To replace all dimensions",
      "To show how long the timber was stored"
    ],
    "correct": 0,
    "hint": "Design changes create several possible versions.",
    "strongHint": "The maker needs to know which drawing is authorised for manufacture.",
    "feedback": [
      "Revision control prevents an outdated drawing being used after a change.",
      "A drawing label cannot change physical strength.",
      "Dimensions remain essential.",
      "Storage history is not the main purpose of revision identification."
    ]
  }
];
window.WRITTEN_QUESTIONS = [
  {
    "title": "1. Evaluate two design features",
    "prompt": "Feature A is a deep carry cut-out close to a pivot. Feature B is a smaller rounded carry detail positioned away from the pivot but it is less visually dramatic. Select the stronger option and justify it using function, strength, appearance, manufacturability and folding clearance.",
    "minWords": 120,
    "concepts": [
      {
        "label": "clear selection",
        "terms": [
          "feature a",
          "feature b",
          "select",
          "choose"
        ]
      },
      {
        "label": "function and user",
        "terms": [
          "carry",
          "function",
          "user",
          "grip",
          "portability"
        ]
      },
      {
        "label": "strength and pivot",
        "terms": [
          "strength",
          "pivot",
          "timber",
          "stress",
          "section"
        ]
      },
      {
        "label": "appearance and manufacture",
        "terms": [
          "appearance",
          "proportion",
          "manufacture",
          "tool",
          "time"
        ]
      },
      {
        "label": "clearance and final judgement",
        "terms": [
          "clearance",
          "fold",
          "collision",
          "overall",
          "balance"
        ]
      }
    ],
    "scaffold": [
      "I would select… because…",
      "For function and the user…",
      "Structurally, the feature…",
      "In appearance and manufacture…",
      "During folding…, so the strongest overall decision is…"
    ],
    "prompts": [
      "State one option clearly rather than describing both without a decision.",
      "Explain how the feature helps carrying and whether the grip is practical.",
      "Discuss remaining timber and the risk of material removal near a pivot.",
      "Compare visual effect with the time and tools needed to manufacture accurately.",
      "Include full movement clearance and conclude using the best overall balance."
    ],
    "model": "I would select Feature B, the smaller rounded carry detail away from the pivot. It still improves portability by giving the user a defined grip, although the exact radius and edge treatment would need to feel comfortable. Structurally, it preserves more timber around the pivot hole and avoids increasing stress in a loaded area. Feature A may appear more dramatic, but the deeper cut is harder to produce consistently and has a greater risk of weakening the frame. Feature B can be templated and refined with available workshop processes. Its position should also be traced through the full folding path to confirm that it cannot collide with another member. Overall, Feature B gives the stronger balance of function, safety, manufacture and appearance."
  },
  {
    "title": "2. Explain an orthogonal view set for the folding chair",
    "prompt": "Explain what the front, top and side views each communicate, how the views align in third-angle projection and why the side view is especially important for this moving product.",
    "minWords": 105,
    "concepts": [
      {
        "label": "front view information",
        "terms": [
          "front view",
          "width",
          "height",
          "symmetry",
          "slat"
        ]
      },
      {
        "label": "top view information",
        "terms": [
          "top view",
          "depth",
          "spacing",
          "thickness"
        ]
      },
      {
        "label": "side view mechanism",
        "terms": [
          "side view",
          "pivot",
          "fold",
          "seat height",
          "overlap"
        ]
      },
      {
        "label": "third-angle placement",
        "terms": [
          "third angle",
          "above",
          "right",
          "aligned"
        ]
      },
      {
        "label": "cross-view alignment",
        "terms": [
          "project",
          "same height",
          "align",
          "centre"
        ]
      }
    ],
    "scaffold": [
      "The front view shows…",
      "The top view shows…",
      "The side view is especially important because…",
      "In third-angle projection…",
      "Features must align between views so…"
    ],
    "prompts": [
      "Include width, height, symmetry or slat arrangement in the front view.",
      "Include depth, spacing or thickness in the top view.",
      "Explain folding geometry, pivot centres, member overlap or seat height in the side view.",
      "State where the top and right-side views are placed.",
      "Explain that the same feature must project consistently across views."
    ],
    "model": "The front view communicates the overall width and height, symmetry of the frame and the arrangement of the seat or back slats. The top view communicates depth, spacing, thickness and alignment across the chair. The side view is especially important because it shows the crossing frame members, pivot centres, seat height, overlap and the geometry of the open and folded positions. In third-angle projection, the top view is placed above the front view and the right-side view is placed to the right. Corresponding features must align between views, so a pivot centre at a particular height in the front view projects to the same height in the side view."
  },
  {
    "title": "3. Critique a faulty technical drawing",
    "prompt": "A student CAD drawing has no units, dimensions the pivot from a curved end, repeats one overall dimension twice with different values, and does not show which face is countersunk. Explain the problems and specify how the drawing should be corrected.",
    "minWords": 120,
    "concepts": [
      {
        "label": "units and authority",
        "terms": [
          "millimetre",
          "unit",
          "written dimension",
          "do not scale"
        ]
      },
      {
        "label": "datum problem",
        "terms": [
          "curved end",
          "datum",
          "reference",
          "centre"
        ]
      },
      {
        "label": "duplicate contradiction",
        "terms": [
          "duplicate",
          "contradict",
          "two values",
          "revision"
        ]
      },
      {
        "label": "countersink note",
        "terms": [
          "countersink",
          "face",
          "left",
          "right",
          "leader"
        ]
      },
      {
        "label": "independent check",
        "terms": [
          "check",
          "plan",
          "actual component",
          "approval"
        ]
      }
    ],
    "scaffold": [
      "The missing units create…",
      "Dimensioning from the curved end is unreliable because…",
      "The repeated conflicting dimensions should be…",
      "The countersink requirement needs…",
      "Before release, the drawing should be checked against…"
    ],
    "prompts": [
      "State that the drawing must identify millimetres and rely on written dimensions.",
      "Explain why a curved, shaped feature is a poor datum for a critical hole centre.",
      "Remove duplication, resolve the correct value and apply revision control.",
      "Use a clear symbol or leader note showing the correct mirrored face.",
      "Finish with an independent cross-check against the supplied plan and approved design."
    ],
    "model": "The drawing should state that dimensions are in millimetres and must not rely on scaling the printed image. Locating the pivot from a curved end is unreliable because the exact reference point may change during shaping; the centre should be dimensioned from an established straight datum and reference face. The duplicated overall dimensions create a contradiction, so the correct value must be confirmed, shown once in the clearest location and recorded in the current revision. A leader note or recognised symbol must identify which face is countersunk, including the mirrored left- and right-hand orientation. Before release, every critical value should be checked against the supplied plan, approved design decision and, where useful, the actual component."
  },
  {
    "title": "4. Describe a reliable CAD workflow",
    "prompt": "Describe a CAD workflow for adding an approved design feature to the chair. Include units, layers, datums, geometric constraints, dimensions, revision control and checking before manufacture.",
    "minWords": 125,
    "concepts": [
      {
        "label": "units and layers",
        "terms": [
          "millimetre",
          "unit",
          "layer",
          "outline",
          "centre line"
        ]
      },
      {
        "label": "datum-based geometry",
        "terms": [
          "datum",
          "reference",
          "main geometry",
          "feature"
        ]
      },
      {
        "label": "constraints",
        "terms": [
          "constraint",
          "parallel",
          "perpendicular",
          "concentric",
          "equal"
        ]
      },
      {
        "label": "dimensions and notes",
        "terms": [
          "dimension",
          "annotation",
          "leader",
          "radius",
          "diameter"
        ]
      },
      {
        "label": "revision and verification",
        "terms": [
          "revision",
          "date",
          "check",
          "plan",
          "component",
          "approved"
        ]
      }
    ],
    "scaffold": [
      "I would begin the CAD file by…",
      "The base geometry would be constructed from…",
      "Constraints would be used to…",
      "Dimensions and notes would show…",
      "Before manufacture, the revision would be…"
    ],
    "prompts": [
      "Set millimetres and separate line types or information with layers.",
      "Build from reliable datums before adding the new detail.",
      "Explain how constraints maintain intended geometric relationships.",
      "Add only the dimensions and notes needed to manufacture and inspect the feature.",
      "Identify the revision and independently compare it with the plan, approved sketch and actual parts."
    ],
    "model": "I would begin by setting the CAD file to millimetres and creating layers for visible outlines, hidden detail, centre lines, dimensions and notes. The approved chair geometry would be constructed from the established datums before the new feature was added. Geometric constraints would keep related lines parallel, perpendicular or equal and keep circular features concentric where required. I would dimension the feature from clear reference faces, include its radius or diameter, and add any leader notes needed for manufacture, clearance or countersink orientation. The file would receive a revision number and date after the change. Before manufacture, the drawing would be checked independently against the supplied chair plan, approved concept sketch and the actual component dimensions so a precise but incorrect entry is not carried into production."
  }
];
