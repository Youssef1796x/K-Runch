type ReceiptLine = {
  itemName: string;
  optionLabel?: string;
  quantity: number;
  lineTotal: number;
};

type ReceiptGroup = {
  itemName: string;
  lines: ReceiptLine[];
};

type CreateOrderReceiptImageOptions = {
  restaurantName: string;
  time: string;
  groups: ReceiptGroup[];
  totalPrice: number;
};

const escapeXml = (value: string | number) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function createOrderReceiptImage({
  restaurantName,
  time,
  groups,
  totalPrice,
}: CreateOrderReceiptImageOptions): Promise<Blob> {
  const width = 1080;
  const padding = 76;
  const contentRight = width - padding;
  const contentLeft = padding;
  const lineHeight = 50;
  const groupGap = 34;

  let y = 110;
  const bodyParts: string[] = [];

  bodyParts.push(
    `<text x="${contentRight}" y="${y}" text-anchor="end" class="restaurant">${escapeXml(restaurantName)}</text>`,
  );

  y += 62;
  bodyParts.push(
    `<text x="${contentRight}" y="${y}" text-anchor="end" class="title">طلب جديد</text>`,
  );

  y += 52;
  bodyParts.push(
    `<text x="${contentRight}" y="${y}" text-anchor="end" class="meta">الساعة: ${escapeXml(time)}</text>`,
  );

  y += 46;
  bodyParts.push(
    `<line x1="${contentLeft}" y1="${y}" x2="${contentRight}" y2="${y}" class="rule" />`,
  );

  y += 64;
  bodyParts.push(
    `<text x="${contentRight}" y="${y}" text-anchor="end" class="section">الطلب</text>`,
  );

  y += 58;

  for (const group of groups) {
    bodyParts.push(
      `<text x="${contentRight}" y="${y}" text-anchor="end" class="item">${escapeXml(group.itemName)}</text>`,
    );

    y += 42;

    for (const line of group.lines) {
      const details = line.optionLabel
        ? `${line.optionLabel} × ${line.quantity}`
        : `× ${line.quantity}`;

      bodyParts.push(
        `<text x="${contentRight}" y="${y}" text-anchor="end" class="detail">${escapeXml(details)}</text>`,
      );
      bodyParts.push(
        `<text x="${contentLeft}" y="${y}" text-anchor="start" class="price">${escapeXml(line.lineTotal)} جنيه</text>`,
      );

      y += lineHeight;
    }

    y += groupGap;
  }

  y += 10;
  bodyParts.push(
    `<line x1="${contentLeft}" y1="${y}" x2="${contentRight}" y2="${y}" class="rule" />`,
  );

  y += 70;
  bodyParts.push(
    `<text x="${contentRight}" y="${y}" text-anchor="end" class="totalLabel">الإجمالي</text>`,
  );
  bodyParts.push(
    `<text x="${contentLeft}" y="${y}" text-anchor="start" class="totalPrice">${escapeXml(totalPrice)} جنيه</text>`,
  );

  y += 64;
  bodyParts.push(
    `<text x="${contentRight}" y="${y}" text-anchor="end" class="note">شكرًا لطلبك</text>`,
  );

  const height = y + 80;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" direction="rtl">
  <style>
    text {
      font-family: Arial, "Noto Sans Arabic", sans-serif;
      fill: #171717;
      direction: rtl;
      unicode-bidi: plaintext;
    }
    .restaurant { font-size: 42px; font-weight: 700; }
    .title { font-size: 34px; font-weight: 700; }
    .meta { font-size: 28px; font-weight: 400; fill: #5f5f5f; }
    .section { font-size: 30px; font-weight: 700; }
    .item { font-size: 30px; font-weight: 700; }
    .detail { font-size: 27px; font-weight: 400; }
    .price { font-size: 27px; font-weight: 600; }
    .totalLabel { font-size: 30px; font-weight: 700; }
    .totalPrice { font-size: 34px; font-weight: 700; }
    .note { font-size: 24px; font-weight: 400; fill: #6b6b6b; }
    .rule { stroke: #d7d7d7; stroke-width: 2; }
  </style>
  <rect width="100%" height="100%" fill="#fffdf8" />
  <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="30" fill="#fffdf8" stroke="#dedbd3" stroke-width="2" />
  ${bodyParts.join("\n")}
</svg>`;

  const svgBlob = new Blob([svg], {
    type: "image/svg+xml;charset=utf-8",
  });
  const svgUrl = URL.createObjectURL(svgBlob);

  try {
    const image = new Image();

    const pngBlob = await new Promise<Blob>((resolve, reject) => {
      image.onload = () => {
        const scale = 2;
        const canvas = document.createElement("canvas");
        canvas.width = width * scale;
        canvas.height = height * scale;

        const context = canvas.getContext("2d");

        if (!context) {
          reject(new Error("تعذر إنشاء صورة الطلب."));
          return;
        }

        context.scale(scale, scale);
        context.drawImage(image, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("تعذر تحويل الطلب إلى صورة."));
            return;
          }

          resolve(blob);
        }, "image/png");
      };

      image.onerror = () => {
        reject(new Error("تعذر تحميل صورة الطلب."));
      };

      image.src = svgUrl;
    });

    return pngBlob;
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
}
