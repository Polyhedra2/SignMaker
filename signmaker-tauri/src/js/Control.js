// Control.js

class TextElement {
  constructor({
    textContent = "New Sign",
    backgroundColor = "Inherit",
    fontFamily = "Clearview 5WR",
    fontSize = 100,
    useBannerFormatting = false,
    bannerFormattingSize = 100,
    bannerFirstLetterSize = 120,
    useNumeralFormatting = false,
    numeralFormattingSize = 120,
    alignment = "Center",
  } = {}) {
    this.textContent = textContent;
    this.fontFamily = fontFamily;
    this.backgroundColor = backgroundColor;
    this.fontSize = fontSize;
    this.useBannerFormatting = useBannerFormatting;
    this.useNumeralFormatting = useNumeralFormatting;
    this.bannerFormattingSize = bannerFormattingSize;
    this.numeralFormattingSize = numeralFormattingSize;
    this.bannerFirstLetterSize = bannerFirstLetterSize;
    this.alignment = alignment;
  }

  splitString() {
    let result = [this.textContent];

    // Define the banner types to split by if useBannerFormating is true
    const numeralPattern = /(\d+\S*)|([\u00BC-\u00BE]+\S*)/;

    if (this.useBannerFormatting) {
      const bannerPattern = new RegExp(
        `(${Shield.prototype.bannerTypes.join("|")})`,
        "g"
      );
      result = result[0].split(bannerPattern).filter(Boolean); // Filter to remove empty strings
    }

    if (this.useNumeralFormatting) {
      let newResult = [];
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        let currentResult = result[i].split(numeralPattern).filter(Boolean);
        newResult = newResult.concat(currentResult);
      }
      result = newResult;
    }

    return result;
  }

  createTextElement() {
    const newText = document.createElement("div");

    // Set custom CSS properties here based off the this. properties
    newText.style["--fontFamily"] = this.fontFamily;
    newText.style["--fontSize"] = 1.75 * (this.fontSize / 100) + "rem";
    newText.style["--backgroundColor"] = lib.colors[this.backgroundColor] || this.backgroundColor;
  }
}

TextElement.prototype.fontFamily = [
  "Clearview 3W",
  "Clearview 5WR",
  "Clearview 4W",
  "Series A",
  "Series B",
  "Series C",
  "Series D",
  "Series E",
  "Series EM",
  "Series F",
];

TextElement.prototype.alignment = ["Left", "Center", "Right"];

TextElement.prototype.backgroundColor = ["Inherit"].concat(
  Object.keys(lib.colors)
);

class ControlTextElement extends TextElement {
  constructor({
    spacing = 0,
    smallCapitals = false,
    firstLetterSize = 120,
  } = {}) {
    super();
    this.spacing = spacing;
    this.smallCapitals = smallCapitals;
    this.firstLetterSize = firstLetterSize;
  }
}

class ActionMessageElement extends TextElement {
  constructor({ useNumeralFormatting = true } = {}) {
    super();
    this.useNumeralFormatting = useNumeralFormatting;
  }
}

class AdvisoryMessageElement extends TextElement {
  constructor({
    backgroundColor = "Yellow",
    fontFamily = "Series E",
    formatNumeral = true,
    borderRadius = 4,
    useNumeralFormatting = true,
  } = {}) {
    super();
    this.backgroundColor = backgroundColor;
    this.fontFamily = fontFamily;
    this.formatNumeral = formatNumeral;
    this.borderRadius = borderRadius;
    this.useNumeralFormatting = useNumeralFormatting;
  }
}

class ShieldElement extends Shield {
  constructor({ shieldBase = "I-", shieldType = "", routeNumber = 1 } = {}) {
    super();
    this.type = shieldBase;
    this.specialBannerType = shieldType;
    this.routeNumber = routeNumber;
  }
}

class DividerElement {
  constructor({
    dividerWidth = 100,
    dividerMeasurement = "%",
    dividerHeight = 0.5,
    alignment = "Center",
  } = {}) {
    this.dividerWidth = dividerWidth;
    this.dividerMeasurement = dividerMeasurement;
    this.dividerHeight = dividerHeight;
    this.alignment = alignment;
  }
}

DividerElement.prototype.dividerMeasurement = ["%", "rem"];

class IconElement {
  constructor({
    icon = "Airplane",
    iconSize = 100,
    backgroundColor = "Inherit",
    border = false,
    borderRadius = 4,
    borderColor = "White",
    spacing = 4,
  } = {}) {
    this.icon = icon;
    this.iconSize = iconSize;
    this.backgroundColor = backgroundColor;
    this.border = border;
    this.borderRadius = borderRadius;
    this.borderColor = borderColor;
    this.spacing = spacing;
  }
}

IconElement.prototype.icons = ["Airplane"];

class Control {
  constructor({ rows = [] } = {}) {
    this.rows = rows;
  }

  addElement(element, properties, row, column) {
    let newElement = new element(properties);
    if (!this.rows[row]) {
      this.rows[row] = [];
    }

    if (column) {
      this.rows[row].splice(column, 0, newElement);
    } else {
      this.rows[row].push(newElement);
    }
  }

  removeElement(row, column) {
    if (row == null || column == null) {
      return;
    }

    this.rows[row].splice(column, 1);
    if (this.rows[row].length == 0) {
      this.rows.splice(row, 1);
      return true;
    }
    return false;
  }

  addRow(row) {
    this.addElement(ControlTextElement, {}, row, 0);
  }

  duplicateRow(row) {
    let newRows = [];
    for (const e of this.rows[row]) {
      const blockElemType = Control.prototype.blockToClassElems.getElem(e);
      newRows.push(
        Object.assign(
          new Control.prototype.blockToClassElems[blockElemType](),
          e
        )
      );
    }
    this.rows.splice(row + 1, 0, newRows);
  }

  deleteRow(row) {
    this.rows.splice(row, 1);
  }
}

Control.prototype.blockToClassElems = {
  ControlTextElement: ControlTextElement,
  DividerElement: DividerElement,
  ShieldElement: ShieldElement,
  AdvisoryMessageElement: AdvisoryMessageElement,
  IconElement: IconElement,
  ActionMessageElement: ActionMessageElement,
  getElem: (elemObj) => {
    for (const key in Control.prototype.blockToClassElems) {
      if (elemObj instanceof Control.prototype.blockToClassElems[key]) {
        return key;
      }
    }
    return null;
  },
};

Control.prototype.blockElements = {
  ControlTextElement: "Control Text",
  DividerElement: "Divider",
  ShieldElement: "Shield",
  AdvisoryMessageElement: "Advisory Message",
  IconElement: "Icon",
  ActionMessageElement: "Action Message",
};

Control.prototype.blockInternalElements = {
  ControlTextElement: "sdCtrlText",
  DividerElement: "sdBlocker",
  ShieldElement: "sdShield",
  AdvisoryMessageElement: "sdAdvisory",
  IconElement: "sdIcon",
  ActionMessageElement: "sdActionMessage",
};
