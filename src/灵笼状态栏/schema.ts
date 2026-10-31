const AssetSchema = z.object({
  名称: z.string().prefault('未知资产'),
  类型: z.enum(['租约', '不动产', '重型设备', '技艺', '凭证']).prefault('不动产'),
  详情: z.string().prefault(''),
});

const MemberSchema = z.object({
  源质余额: z.coerce
    .number()
    .transform(v => _.clamp(v, 0, 100))
    .prefault(0),
  情绪波动: z.coerce
    .number()
    .transform(v => _.clamp(v, 0, 100))
    .prefault(0),
  基础战力: z.coerce.number().prefault(0),
});

const TaskSchema = z.object({
  任务目标: z.string().prefault(''),
  髓晶耗尽时间: z.string().prefault('未激活/未知'),
  周边威胁: z.string().prefault('无明显异常'),
  携带物资: z.record(z.string().describe('物品名称'), z.string().describe('数量与功效')).prefault({}),
});

export const Schema = z.object({
  当前地点: z.string().prefault('未知区域'),
  当前时间: z.string().prefault('2099年1月1日 星期四 17:00'),
  晶币余额: z.coerce.number().prefault(0),
  资产与潜能: z.array(AssetSchema).prefault([]),
  角色好感度: z
    .record(
      z.string().describe('角色名称'),
      z.coerce.number().transform(v => _.clamp(v, -100, 100)),
    )
    .prefault({}),
  镜头人物: z.record(z.string().describe('角色名称'), MemberSchema).prefault({}),
  外勤任务: TaskSchema.prefault({}),
});
export type Schema = z.output<typeof Schema>;
