import { registerMvuSchema } from 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js';


const AssetSchema = z.object({
  名称: z.string(),
  类型: z.enum(['租约', '不动产', '重型设备', '技艺', '凭证']),
  详情: z.string()
});

const MemberSchema = z.object({
  源质余额: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
  情绪波动: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
  基础战力: z.coerce.number()
});

const TaskSchema = z.object({
  任务目标: z.string(),
  髓晶耗尽时间: z.string(),
  周边威胁: z.string(),
  携带物资: z.record(z.string().describe('物品名称'), z.string().describe('数量与功效'))
});


export const Schema = z.object({
  当前地点: z.string(),
  当前时间: z.string(),
  晶币余额: z.coerce.number(),
  资产与潜能: z.array(AssetSchema),
  角色好感度: z.record(z.string().describe('角色名称'), z.coerce.number().transform(v => _.clamp(v, -100, 100))),
  镜头人物: z.record(z.string().describe('角色名称'), MemberSchema),
  外勤任务: TaskSchema
});


$(() => {
  registerMvuSchema(Schema);
});